import React from 'react';
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import axios from '../../axios/axios-quiz'

class Quiz extends React.Component {

    state = {
        results: {},
        isFinished: false,
        activeQustion: 0,
        answerState: null, 
        quiz: [],
        loading: true
    }

     onAnswerClickHandler = (answerId) =>  {
         if (this.state.answerState) {
             const key = Object.keys(this.state.answerState)[0]
             if (this.state.answerState[key] === 'Success') {
                 return
             }
         }

        const question = this.state.quiz[this.state.activeQustion]
        const results = this.state.results

        if (question.rightAnswerId === answerId) {

            if (!results[question.id]) {
                results[question.id] = 'Success'
            }

            this.setState({
                answerState: {[answerId]: 'Success'},
                results
            })
            
            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQustion: this.state.activeQustion + 1,
                        answerState: null
                    })
                }

                window.clearTimeout(timeout)
            },1000)

        } else {
            results[question.id] = 'Error'
            this.setState({
                answerState: {[answerId]: 'Error'},
                results
            })
        }
     }

     isQuizFinished() {
         return this.state.activeQustion + 1 === this.state.quiz.length
     }

     retryHandler = () => {
        this.setState({
            activeQustion: 0,
            answerState: null,
            isFinished: false,
            results: { }
        })
     }

    async componentDidMount() {
        try {
            const response = await axios.get(`/quizes/${this.props.match.params.id}.json`)
            const quiz = response.data

            this.setState({
                quiz, loading: false
            })
        } catch (e) {
            console.log(e)
        }
        console.log('Quiz ID =', this.props.match.params.id)
    }

    render() {
        return(
            <div className={classes.Quiz}>

                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    { this.state.loading
                    ? <Loader /> 
                    :   
                        this.state.isFinished 
                        ? <FinishedQuiz 
                            results={this.state.results}
                            quiz={this.state.quiz}
                            onRetry={this.retryHandler}
                        /> 
                        : 
                        <ActiveQuiz 
                            question={this.state.quiz[this.state.activeQustion].question}
                            answers={this.state.quiz[this.state.activeQustion].answers}
                            onAnswerClick={this.onAnswerClickHandler}
                            quizLength={this.state.quiz.length}
                            answerNumber={this.state.activeQustion + 1}
                            state={this.state.answerState}
                        />
                      }
                
                </div>
            </div>
        )
    }
}

export default Quiz