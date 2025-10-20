import { setAllAppliedJobs } from "../Redux/jobSlice";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get( import.meta.env.VITE_APPLICATION_API_ENDPOINT+`/get`, {withCredentials:true});
                console.log("useGetAppliedJobs hook-",res.data);
                if(res.data.success){
                    dispatch(setAllAppliedJobs(res.data.applications));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAppliedJobs();
    },[])
};
export default useGetAppliedJobs;