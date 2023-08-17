import { usePage } from "@inertiajs/react";

const ProfilePage = () => {
    const { props } = usePage();
    console.log(props);
    
    return <div>user profile page deba</div>;
};
export default ProfilePage;
