interface FollowersModalProps {
    onClose: () => void;
    followers: {
        id: number;
        name: string;
        profileImage?: string;
    }[];
    followings: {
        id: number;
        name: string;
        profileImage?: string;
    }[];
    activeTab: 'followers' | 'followings';
}
declare function FollowersModal({ onClose, followers, followings, activeTab: initialTab }: FollowersModalProps): import("@emotion/react/jsx-runtime").JSX.Element;
export default FollowersModal;
