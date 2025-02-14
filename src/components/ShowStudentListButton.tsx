interface ButtonProps {
  handleClick: () => void;
}

const ShowStudentListButton: React.FC<ButtonProps> = ({ handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="flex flex-row gap-1  items-center justify-center border border-blue-500 text-white bg-blue-500 hover:text-blue-500 hover:bg-white font-medium py-2 px-4 rounded-md transition-all float-right m-1"
    >
      <p>Show</p>
      <p>Student</p>
      <p>List</p>
    </button>
  );
};

export default ShowStudentListButton;
