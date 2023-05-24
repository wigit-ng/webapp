package handlers

import (
	"encoding/json"
	"errors"
	"net/http"
	"strings"
	"time"

	"github.com/cristalhq/jwt/v5"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/rs/zerolog/log"
	"github.com/wigit-gh/webapp/internal/api/v1/middlewares"
	"github.com/wigit-gh/webapp/internal/db/models"
	"gorm.io/gorm"
)

// JWTAuthentication validates a user's signin JWT token set in the `Authorization` header.
func JWTAuthentication(ctx *gin.Context) {
	authHeader := ctx.GetHeader("Authorization")
	if authHeader == "" {
		ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Authorization header missing"})
		return
	}

	bearerToken := strings.Split(authHeader, " ")
	if len(bearerToken) != 2 {
		ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Invalid Authorization header format"})
		return
	}

	if bearerToken[0] != "Bearer" {
		ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Authorization value does not contain Bearer"})
		return
	}

	userID, err := validateJWTToken(bearerToken[1])
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	user, err := getUserByID(userID)
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.Set("user", user)
	ctx.Next()
}

// validateJWTToken checks the validity of the jwt token provided.
// It returns the user ID stored in the claims, and any error if any occurs.
func validateJWTToken(_token string) (string, error) {
	// Parse token and verify the signature
	token, err := jwt.Parse([]byte(_token), middlewares.JWTVerifier)
	if err != nil {
		log.Error().Err(err).Msg("failed to parse JWT token")
		return "", errors.New("Failed to parse JWT token")
	}

	// Retrieve claims stored in token
	claims := new(jwt.RegisteredClaims)
	if err := json.Unmarshal(token.Claims(), claims); err != nil {
		log.Error().Err(err).Msg("failed to Unmarshal claims")
		return "", errors.New("Failed to Unmarshal claims")
	}

	// Validate claims
	if !claims.IsValidAt(time.Now()) {
		return "", errors.New("Token has expired")
	}

	return claims.ID, nil
}

// getUserFromDB gets the user with `email` from the database.
func getUserByID(id string) (*models.User, error) {
	dbUser := new(models.User)

	if _, err := uuid.Parse(id); err != nil {
		return nil, errors.New("ID not a valid uuid")
	}

	if err := DBConnector.Query(func(tx *gorm.DB) error {
		return tx.First(dbUser, "id = ?", id).Error
	}); err != nil && errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, errors.New("Not user with given ID")
	} else if err != nil {
		return nil, errors.New("Something went wrong!")
	}

	return dbUser, nil
}

// Authorization validates if the user has admin privileges or not.
func AdminAuthorization(ctx *gin.Context) {
	_user, exists := ctx.Get("user")
	if !exists {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "User not set in context"})
		return
	}

	user, ok := _user.(*models.User)
	if !ok {
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": ErrInternalServer.Error()})
		return
	}

	if *user.Role != "admin" {
		ctx.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "You are not allowed to view this resource"})
		return
	}

	ctx.Next()
}