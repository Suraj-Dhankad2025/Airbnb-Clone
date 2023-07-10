'use client'
import { useCallback, useState } from 'react';
import Avatar from '../Avatar';
import { AiOutlineMenu } from 'react-icons/ai'
import MenuItem from './MenuItem';
import userRegisterModel from '@/app/hooks/useRegisterModel';
import useLoginModel from '@/app/hooks/useLoginModel';
import useRentModel from '@/app/hooks/useRentModel';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
interface UserMenuProps {
    currentUser?: SafeUser | null;
}
const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const registerModel = userRegisterModel();
    const loginModel = useLoginModel();
    const rentModel = useRentModel();
    const [isOpen, setisOpen] = useState(false);
    const toggleOpen = useCallback(() => {
        setisOpen((value) => !value);
    }, []);
    const onRent = useCallback(() => {
        if (!currentUser) {
            return loginModel.onOpen();
        }
         rentModel.onOpen();
    },[currentUser, loginModel, rentModel]);

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div onClick={onRent}
                    className="
            hidden
            md:block
            text-sm
            font-semibold
            py-3
            px-4
            rounded-full
            hover:bg-neutral-100
            transition
            cursor-pointer

            "
                >
                    Airbnb your home
                </div>
                <div onClick={toggleOpen}
                    className="
            p-4
            md:py-1
            md:px-2
            border-[1px]
            border-neutral-200
            flex
            flex-row
            items-center
            gap-3
            rounded-full
            cursor-pointer
            hover:shadow-md
            transition
            "
                >
                    <AiOutlineMenu />
                    <div className='
               hidden
               md:block

               '>
                        <Avatar src={currentUser?.image}/>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className='
            absolute
            rounded-xl
            shahdow-md
            w-[40vw]
            md:w-3/4
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
            '>
                    <div className='flex flex-col cursor-pointer'>
                        {currentUser ? (
                            <>
                                <MenuItem
                                    onClick={()=>{}}
                                    label='My Trips'
                                />
                                <MenuItem
                                    onClick={()=>{}}
                                    label='My Favorites'
                                />
                                <MenuItem
                                    onClick={()=>{}}
                                    label='My Reservations'
                                />
                                <MenuItem
                                    onClick={()=>{}}
                                    label='My Properties'
                                />
                                <MenuItem
                                    onClick={rentModel.onOpen}
                                    label='Airbnb my home'
                                />
                                <hr />
                                <MenuItem
                                    onClick={()=>signOut()}
                                    label='Logout'
                                /> 
                            </>
                        ) : (
                            <>
                                <MenuItem
                                    onClick={loginModel.onOpen}
                                    label='Login'
                                />
                                <MenuItem
                                    onClick={registerModel.onOpen}
                                    label='Sign up'
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserMenu;