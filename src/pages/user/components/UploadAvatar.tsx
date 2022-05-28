import { ChangeEvent, useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { toast } from 'react-toastify';

interface UploadAvatarProps {
    setFieldValue: (field: string, value: File) => void;
}

const UploadAvatar: React.FC<UploadAvatarProps> = ({ setFieldValue }) => {
    const [preview, setPreview] = useState<string>('');

    const handlePreview = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file || !file.type.includes('image')) {
            toast.error('Please select an image!');
            return;
        }

        if (file.size > 1000000) {
            toast.error('Image file size must be less than 1MB!');
            return;
        }

        if (file) {
            setPreview(URL.createObjectURL(file));
            setFieldValue('avatarFile', file);
        }
    };

    useEffect(() => {
        return () => {
            preview && URL.revokeObjectURL(preview);
        };
    }, [preview]);

    return (
        <div className="my-4 d-flex flex-column gap-3">
            <input type="file" onChange={handlePreview} />
            {preview && (
                <Image
                    src={preview}
                    alt="avatar"
                    roundedCircle
                    width={80}
                    height={80}
                />
            )}
        </div>
    );
};

export default UploadAvatar;
