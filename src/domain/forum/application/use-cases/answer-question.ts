import { Either, right } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

type AnswerQuestionUseCaseResponse = Either<null, {
  answer: Answer
}>

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      questionId: new UniqueEntityId(questionId),
      authorId: new UniqueEntityId(instructorId)
    })

    await this.answersRepository.create(answer)

    return right({
      answer
    })
  }
}
