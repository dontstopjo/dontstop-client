import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const OAuthFailurePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    alert("로그인에 실패했습니다. 다시 시도해주세요.");
    navigate("/", { replace: true });
  }, [navigate]);

  return null;
};
