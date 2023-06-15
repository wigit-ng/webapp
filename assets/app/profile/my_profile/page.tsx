// profile page
"use client";

import { useRouter } from 'next/navigation';
import { useSignInContext } from '@app/SignInContextProvider';
import Input from '@components/Input';
import Button from '@components/Button';
import { useState } from 'react';


const ProfilePage = () => {
    const { jwt, setJwt } = useSignInContext();
    const headers = {'Authorization': 'Bearer ' + jwt};
    const [ editProfile, setEditProfile ] = useState(false);
    
    const user =  JSON.parse(sessionStorage.getItem('user'));
    const router = useRouter();
    
    const handleEditProfile = () => {
        setEditProfile(currValue => !currValue);
    }
    
    //update session storage with details
    return (
        <section>
            <button onClick={handleEditProfile}>Edit</button>
            {!editProfile ?
                <div>
                    <div className='profile_data bg-slate-300'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480v53q0 56-39.5 94.5T744-294q-36 0-68-17.5T627-361q-26 34-65 50.5T480-294q-78 0-132.5-54T293-480q0-78 54.5-133T480-668q78 0 132.5 55T667-480v53q0 31 22.5 52t54.5 21q31 0 53.5-21t22.5-52v-53q0-142-99-241t-241-99q-142 0-241 99t-99 241q0 142 99 241t241 99h214v60H480Zm0-274q53 0 90-36.5t37-89.5q0-54-37-91t-90-37q-53 0-90 37t-37 91q0 53 37 89.5t90 36.5Z"/></svg>
                        <p >{ user.email }</p>
                    </div>
                    <div className='profile_data bg-slate-300'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480v53q0 56-39.5 94.5T744-294q-36 0-68-17.5T627-361q-26 34-65 50.5T480-294q-78 0-132.5-54T293-480q0-78 54.5-133T480-668q78 0 132.5 55T667-480v53q0 31 22.5 52t54.5 21q31 0 53.5-21t22.5-52v-53q0-142-99-241t-241-99q-142 0-241 99t-99 241q0 142 99 241t241 99h214v60H480Zm0-274q53 0 90-36.5t37-89.5q0-54-37-91t-90-37q-53 0-90 37t-37 91q0 53 37 89.5t90 36.5Z"/></svg>
                    <p className='ml:-2' >{ user.first_name }</p>
                    </div>
                    <div className='profile_data bg-slate-300'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480v53q0 56-39.5 94.5T744-294q-36 0-68-17.5T627-361q-26 34-65 50.5T480-294q-78 0-132.5-54T293-480q0-78 54.5-133T480-668q78 0 132.5 55T667-480v53q0 31 22.5 52t54.5 21q31 0 53.5-21t22.5-52v-53q0-142-99-241t-241-99q-142 0-241 99t-99 241q0 142 99 241t241 99h214v60H480Zm0-274q53 0 90-36.5t37-89.5q0-54-37-91t-90-37q-53 0-90 37t-37 91q0 53 37 89.5t90 36.5Z"/></svg>
                        <p className='ml:-2'>{ user.email }</p>
                    </div>
                    <div className='profile_data bg-slate-300'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480v53q0 56-39.5 94.5T744-294q-36 0-68-17.5T627-361q-26 34-65 50.5T480-294q-78 0-132.5-54T293-480q0-78 54.5-133T480-668q78 0 132.5 55T667-480v53q0 31 22.5 52t54.5 21q31 0 53.5-21t22.5-52v-53q0-142-99-241t-241-99q-142 0-241 99t-99 241q0 142 99 241t241 99h214v60H480Zm0-274q53 0 90-36.5t37-89.5q0-54-37-91t-90-37q-53 0-90 37t-37 91q0 53 37 89.5t90 36.5Z"/></svg>
                        <p className='ml:-2'>{ user.email }</p>
                    </div>
                    <div className='profile_data bg-slate-300'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480v53q0 56-39.5 94.5T744-294q-36 0-68-17.5T627-361q-26 34-65 50.5T480-294q-78 0-132.5-54T293-480q0-78 54.5-133T480-668q78 0 132.5 55T667-480v53q0 31 22.5 52t54.5 21q31 0 53.5-21t22.5-52v-53q0-142-99-241t-241-99q-142 0-241 99t-99 241q0 142 99 241t241 99h214v60H480Zm0-274q53 0 90-36.5t37-89.5q0-54-37-91t-90-37q-53 0-90 37t-37 91q0 53 37 89.5t90 36.5Z"/></svg>
                        <p className='ml:-2'>{ user.email }</p>
                    </div>
                    <p>first name</p>
                    <p>last name</p>
                    <p>{ user.last_name }</p>
                    <p>address</p>
                    <p>{ user.address }</p>
                    <p>phone</p>
                    <p>{ user.phone }</p>
                </div> :
                <form className=' bg-accent'>
                    <Input placeholder='first name' name='first_name' onChange={() => {}} type='text' id='first_name' />
                    <Input name='first_name' onChange={() => {}} type='text' id='first_name' />
                    <Input name='first_name' onChange={() => {}} type='text' id='first_name' />
                    <Input name='first_name' onChange={() => {}} type='text' id='first_name' />
                    <Button type='submit' text='Edit' />
                </form>
            }
        </section>
    );
};

export default ProfilePage;
