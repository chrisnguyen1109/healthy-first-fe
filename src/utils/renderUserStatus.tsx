export const renderUserStatus = (status: boolean) => {
    if (status) {
        return <label className="badge bg-success">Active</label>;
    }

    return <label className="badge bg-danger">Inactive</label>;
};
