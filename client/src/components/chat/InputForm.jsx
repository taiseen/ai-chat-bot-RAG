import { useForm } from 'react-hook-form';


const InputForm = ({ sendMessage, isPending }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        sendMessage(data.query);
        reset();
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-4 border-t borderTheme bgSidebar flex flex-col"
        >
            {errors.query && (
                <p className="text-red-400 text-sm mb-1">{errors.query.message}</p>
            )}

            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Ask something..."
                    {...register('query', { required: 'Please enter a question' })}
                    className="flex-1 p-3 rounded-lg bgInput border borderTheme focus:outline-none focus:ring-2 focus:ring-primary textForeground"
                />

                <button
                    type="submit"
                    disabled={isPending}
                    className="px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg transition"
                >
                    {isPending ? 'Thinking...' : 'Send'}
                </button>
            </div>
        </form>
    );
};

export default InputForm