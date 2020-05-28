import React from 'react';
import classes from './FinishedQuiz.module.css'

const FinishedQuiz = props => {
    const succescCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'Success') {
            total++
        }

        return total
    }, 0)

    return (
        <div className={classes.FinishedQuiz}>

            <ul>
                { props.quiz.map((quizItem, index) => {
                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        classes[props.results[quizItem.id]]
                    ]


                    return (
                        <li key={index}>
                            <strong>{index + 1}</strong>&nbsp;
                            {quizItem.question}
                            <i className={cls.join(' ')}/>
                        </li>
                    )
                }) }
            </ul>

            <p>Правильно {succescCount} из {props.quiz.length}</p>

            <div>
                <button onClick={props.onRetry}>Повторить</button>
            </div>
        </div>
    )
}

export default FinishedQuiz