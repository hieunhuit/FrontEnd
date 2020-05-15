const styles = (theme) => ({
  modal: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-75%)',
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 4),
    outline: 'none',
  },
  header: {
    color: 'black',
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: 'black',
    fontWeight: 700,
    textTransform: 'capitalize',
  },
  content: {
    padding: theme.spacing(2),
  },
  icon: {
    cursor: 'pointer',
    fontSize: '20px',
  },
});
export default styles;
