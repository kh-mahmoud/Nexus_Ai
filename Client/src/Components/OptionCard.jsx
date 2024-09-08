


const OptionCard = ({option}) => {
  return (
    <div className="option-card">
       <img src={option.img} alt="img" width={80} height={80} />
       <span>{option.title}</span>
    </div>
  );
}

export default OptionCard;
