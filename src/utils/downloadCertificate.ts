import { API_URL } from '@/config';

export const downloadCertificate = (id: string) => {
    window.open(`${API_URL}/certificate/${id}/download-certificate`);
};
