import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import GoalForm from '../components/GoalForm'
import Spinner from '../components/Spinner'
import {getGoals, reset} from '../features/goals/goalSlice'

function Dashboard() {
    const {isLoading, isError, message} = useSelector((state) => state.goals)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)
    useEffect(() => {
        if(isError) {
            console.log(message)
        }
        if(!user) {
            navigate('/login')
        }
        dispatch(getGoals())
        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch])
    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className='heading'>
                <h1>Goals Dashboard</h1>
                <p>Welcome {user && user.name}</p>
            </section>
            <GoalForm />
        </>
    )
}

export default Dashboard