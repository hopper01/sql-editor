const buttonStyles = {
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid #FFFFFF',
  borderRadius: '5px',
  lineHeight: 1.5,
  backgroundColor: '#726A95',
  cursor: 'pointer',
  color: "#FFFFFF"
}

const Bouton = ({ children, onClick }) => {
  return (
    <button onClick={onClick} style={buttonStyles}>
      {children}
    </button>
  );
};
export default Bouton;
