import { PageProps } from '@/types';
import { Head} from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
// import Navbar from '@/Components/Navbar';


export default function Edit({
    //@ts-ignore
    mustVerifyEmail,
    //@ts-ignore
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <>
            <Head title="Edit Profile" />

            {/* Navbar */}
            {/* <Navbar /> */}

            {/* Profile Edit Content */}
            <div className="max-w-4xl mx-auto mt-10 p-4 sm:p-6 lg:p-8 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Edit Profile</h1>

                <div className="space-y-6">
                    {/* Update Profile Information Form */}
                    <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} />

                    {/* Update Password Form */}
                    <UpdatePasswordForm />

                    {/* Delete User Form */}
                    <DeleteUserForm />
                </div>
            </div>
        </>
    );
}
