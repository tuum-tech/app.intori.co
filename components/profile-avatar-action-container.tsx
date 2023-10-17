import type { NextPage } from "next";

const ProfileAvatarActionContainer: NextPage = () => {
  return (
    <div className="rounded-31xl bg-primary flex flex-col items-center justify-center p-4">
      <img
        className="relative w-6 h-6 overflow-hidden shrink-0"
        alt=""
        src="/profileiconcontainer.svg"
      />
    </div>
  );
};

export default ProfileAvatarActionContainer;
