import { useNavigate } from "react-router-dom";

interface IStore {
	user: IUser | null | undefined;
	token: string | null | undefined;
}

let Store: IStore = {
	user: null,
	token: null,
};

export function useState() {
	const navigate = useNavigate();

	const set = (key: keyof IStore, value: any) => {
		Store[key] = value;
		localStorage.setItem("data", JSON.stringify(Store));
	};

	const get = (key: keyof IStore) => {
		Store = getData();
		if (key in Store) return Store[key];
		else return null;
	};

	const getData = () => {
		return JSON.parse(localStorage.getItem("data") || "{}") as IStore;
	};

	const reload = (path = "/login") => {
		navigate(path, { replace: true });
	};

	const clear = () => {
		localStorage.removeItem("data");
	};

	return { set, get, getData, reload, clear };
}
