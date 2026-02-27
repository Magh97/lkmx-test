"use client";

import {
    useState, 
    useEffect
} from 'react';

interface User {
    id: number;
    email: string;
    name: string | null;
}

type Users = User[]

type Action = 'create' | 'update' | 'delete';

export default function UsersPage() {
    const [users, setUsers] = useState<Users>([]);
    const [loading, setLoading] = useState(true);
    const [isModalShow, setIsModalShow] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [currentAction, setCurrentAction] = useState<Action | null>(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/users');
            const data = await res.json();
            setUsers(data);
        } catch (err) {

        } finally {
            setLoading(false);
        }
    }

    const updateUser = async () => {
        if (!user) return;

        const { name, email } = user;

        try {
            const res = await fetch(`/api/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email
                })
            });

            if (res.ok) {
                fetchUsers();
                setIsModalShow(false);
                setUser(null);
                alert('User updated');
            } else { 
                alert('Error updating user');
            }
        } catch(err) {
            
        }
    }

    const createUser = async () => {
        try {
            const { name, email } = user!;

            const res = await fetch(`/api/users/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email
                })
            });

            if (res.ok) {
                fetchUsers();
                setIsModalShow(false);
                setUser(null);
                alert('User created');
            } else { 
                alert('Error creating user');
            }
        } catch(err) {
            
        }
    }

    const deleteUser = async () => {}

    const clearForm = () => {
        setUser(null);
    }

    const handleSubmit = async (e: SubmitEvent) => {
        e.preventDefault();

        if (currentAction === 'create') await createUser();
        else if (currentAction === 'update') await updateUser();
        else await deleteUser();

        setCurrentAction(null);
        
    };

    const openModal = (action: Action, user?: User) => {
        setCurrentAction(action)
        if (action === 'create') {
            setUser(null)
        } else setUser(user!);
        setIsModalShow(true);
    }

    if (loading) return (
        <div>

        </div>
    )

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Users
                    </h1>
                    <button
                        onClick={_ => openModal('create')}
                        className="bg-green-500 hover:bg-green-7000 text-white font-bold py-1 px-3 rounded text-xs transition duration-300"
                    >
                        Create User
                    </button>
                </div>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Id</th>
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">Email</th>
                            <th className="py-3 px-6 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {
                            users.map((u) => (
                                <tr key={u.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-6 whitespace-nowrap">{u.id}</td>
                                    <td className="py-3 px-6 whitespace-nowrap">{u.name}</td>
                                    <td className="py-3 px-6 whitespace-nowrap">{u.email}</td>
                                    <td className="py-3 px-6 text-center">
                                        <button onClick={_ => openModal('update', u)} className="bg-blue-500 hover:bg-blue-7000 text-white font-bold py-1 px-3 rounded text-xs transition duration-300">
                                            Update
                                        </button>

                                        <button onClick={_ => openModal('delete', u)} className="bg-red-500 hover:bg-red-7000 text-white font-bold py-1 px-3 rounded text-xs transition duration-300">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                        {
                            users.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="py-4 text-center text-gray-400">
                                        No users ffound
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

            {
                isModalShow && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 felx items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-xl p-6 w-96">
                            <h2 className="text-xl font-bold mb-4">
                                { currentAction === 'create' && ('Create User')}
                                { currentAction === 'update' && ('Update User')}
                                { currentAction === 'delete' && ('Delete User')}
                            </h2>
                            <form onSubmit={_ => handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                                    <input
                                        type="text"
                                        value={user?.name || ""}
                                        onChange={(e) => setUser({
                                            ...user!,
                                            name: e.target.value
                                        })}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                                        placeholder="Jose Perez"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={user?.name || ""}
                                        onChange={(e) => setUser({
                                            ...user!,
                                            email: e.target.value
                                        })}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                                        placeholder="email@email.com"
                                    />
                                </div>

                                <div className="">
                                    <button 
                                        type="button" 
                                        onClick={_ => setIsModalShow(false)}
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                    > 
                                        Close 
                                    </button>
                                    <button 
                                        type="submit"
                                        className={(`text-white font-bold py-2 py-4 rounded ${
                                            ( currentAction === 'delete' ? 'bg-red-600 hover:bg-red-700' : currentAction === 'update' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700')
                                        }`)}
                                    >
                                        { currentAction === 'create' && ('Create')}
                                        { currentAction === 'update' && ('Update')}
                                        { currentAction === 'delete' && ('Delete')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </div>
    );
}