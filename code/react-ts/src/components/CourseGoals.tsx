// import { type FC } from 'react'; // alternative way to type a functional component

type Goal = {
    id: number;
    title: string;       
    description?: string;
}
interface CourseGoalsProps {
    goals?: Goal[];
    onDelete: (goalId: number) => void;
}

export default function CourseGoals({ goals, onDelete }: CourseGoalsProps) {
// export const CourseGoals: FC<CourseGoalsProps> = ({ goals }) => { // alternative way to type a functional component
    return <section>
        <h2>Course Goals</h2>
        <ul>
            {goals?.map((goal) => (
            <li key={goal.id}>
                <article>
                    <div>
                        <h2>{goal.title}</h2>
                        <p>{goal.description}</p>
                    </div>
                    <button onClick={() => onDelete(goal.id)}>Delete</button>
                </article>
                </li>
                ))}
        </ul>
    </section>;
}

// export default CourseGoals; // alternative way to type a functional component