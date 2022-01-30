/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMe } from "../utils/hooks";

function Profile() {
  const { me } = useMe();
  const router = useRouter();

  useEffect(() => {
    if (me) {
      const isEmpty: boolean = Object.keys(me).length === 0;
      isEmpty ? router.push("/") : null;
    }
  }, [me]);

  return <div>this is my profile page</div>;
}

export default Profile;
