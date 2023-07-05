import useStore from "../store";

const { code } = useStore();

export const query = useQuery({
    queryFn: () => api.loginServer({ code }), 
    queryKey: ["getProductos"],
    refetchInterval: 2000,
});