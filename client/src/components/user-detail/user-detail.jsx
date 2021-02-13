import { useParams } from "react-router";

export const UserDetail = () => {
  let { id } = useParams();
  return(
    <div>{`${id}`}</div>
  )}
