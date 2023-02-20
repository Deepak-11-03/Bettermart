import style from '../styles/Home.module.css'


function Error() {
  return (
    <p className={style.main}>
     
        An error occurred on server
      An error occurred on client Please check your internet connection
    </p>
  )
}

// Error.getInitialProps = ({ res, err }) => {
//   const statusCode = res ? res.statusCode : err ? err.statusCode : 404
//   return { statusCode }
// }

export default Error