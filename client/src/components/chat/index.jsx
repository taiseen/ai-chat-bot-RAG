import ChatWindow from './ChatWindow';
import InputForm from './InputForm';

const ChatLayout = ({
    displayedAnswer,
    sendMessage,
    isPending,
    messages,
}) => {

    return (
        <div className="flex-1 flex flex-col w-full">

            <div className='h-full overflow-auto'>
                <ChatWindow
                    messages={messages}
                    displayedAnswer={displayedAnswer}
                />
            </div>

            <InputForm sendMessage={sendMessage} isPending={isPending} />
        </div>
    );
}

export default ChatLayout