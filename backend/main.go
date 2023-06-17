package main

import (
	"github.com/joho/godotenv"
	"github.com/rs/zerolog/log"
	"github.com/wigit-gh/webapp/backend/internal/api/v1"
	"github.com/wigit-gh/webapp/backend/internal/config"
	"github.com/wigit-gh/webapp/backend/internal/flags"
)

// main Entry point to the program
//
//	@contact.name	API Support
//	@contact.url	/contact
//	@contact.email	ecokeke21@gmail.com
func main() {
	env, logFile := flags.Parse()

	switch env {
	case "prod":
		if logFile == nil {
			log.Panic().Msg("failed to create log file for prod mode")
		}
		defer logFile.Close()
	default:
		if err := godotenv.Load(); err != nil {
			log.Panic().Err(err).Msg("failed to load .env file in dev mode")
		}
	}

	conf := config.NewConfig(env)
	ginRouter := server.SetGINRouterV1(conf)
	httpRouter := server.SetHTTPRouter(ginRouter, conf)
	server.ListenAndServer(httpRouter)
}