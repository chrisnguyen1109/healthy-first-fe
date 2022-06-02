import { uploadAvatar } from '@/api/authApi';
import { useUpdateProfile } from '@/hooks';
import { User } from '@/types';
import { ChangeEvent, useState } from 'react';
import { Image, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';

interface UpdateAvatarProps {
    currentAuth: User;
}

const UpdateAvatar: React.FC<UpdateAvatarProps> = ({ currentAuth }) => {
    const [updatingAvatar, setUpdatingAvatar] = useState(false);

    const { mutate: updateAvatar, isLoading } = useUpdateProfile({
        onSuccess: response => {
            if (response.message === 'Success' && response.data?.record) {
                toast.success('Update avatar successfully!');
            }
        },
    });

    const avatarUpdating = updatingAvatar || isLoading;

    const uploadAvatarFile = async (e: ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files?.[0];

            if (!file || !file.type.includes('image')) {
                toast.error('Please select an image!');
                return;
            }

            if (file.size > 1000000) {
                toast.error('Image file size must be less than 1MB!');
                return;
            }

            setUpdatingAvatar(true);
            const responseUpload = await uploadAvatar(file);

            updateAvatar({ avatar: responseUpload.secure_url });
        } finally {
            setUpdatingAvatar(false);
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <div className="m-t-30 d-flex justify-content-center">
                    <div>
                        <Image
                            src={currentAuth.avatar}
                            alt="avatar"
                            roundedCircle
                            width={150}
                        />
                        <h4 className="card-title m-t-10 text-center">
                            {currentAuth.fullName}
                        </h4>
                        <h6 className="card-subtitle text-center text-uppercase">
                            {currentAuth.role}
                        </h6>
                        <div className="mt-3 text-center">
                            <label
                                className="btn btn-info btn-sm text-white"
                                htmlFor="upload-photo"
                            >
                                {avatarUpdating ? (
                                    <Spinner animation="border" />
                                ) : (
                                    <>
                                        Change avatar{'  '}
                                        <i className="mdi mdi-camera-enhance" />
                                    </>
                                )}
                            </label>
                            <input
                                type="file"
                                id="upload-photo"
                                className="visually-hidden"
                                onChange={uploadAvatarFile}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <hr />
            </div>
            <div className="card-body">
                <small className="text-muted">Email address</small>
                <h6>{currentAuth.email}</h6>
                <small className="text-muted p-t-30 db">Address</small>
                <h6>VNU University of Engineering and Technology</h6>
                <div className="map-box my-3">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8611185520494!2d105.78051921540234!3d21.0382422928293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab354920c233%3A0x5d0313a3bfdc4f37!2sVNU%20University%20of%20Engineering%20and%20Technology!5e0!3m2!1sen!2s!4v1654191057640!5m2!1sen!2s"
                        width="100%"
                        height="150"
                        frameBorder="0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="address"
                    />
                </div>
                <small className="text-muted db">Social Profile</small>
                <br />
                <div className="d-flex gap-2">
                    <button className="btn btn-circle btn-secondary">
                        <i className="fab fa-facebook-f"></i>
                    </button>
                    <button className="btn btn-circle btn-secondary">
                        <i className="fab fa-twitter"></i>
                    </button>
                    <button className="btn btn-circle btn-secondary">
                        <i className="fab fa-youtube"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateAvatar;
