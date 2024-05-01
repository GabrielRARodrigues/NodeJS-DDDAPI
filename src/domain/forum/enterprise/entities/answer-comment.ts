import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional'

export interface AnswerCommentProps {
  authorId: UniqueEntityId
  answerID: UniqueEntityId
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class AnswerComment extends Entity<AnswerCommentProps> {
  static create(
    props: Optional<AnswerCommentProps, 'createdAt'>,
    id?: UniqueEntityId
  ) {
    const answerComment = new AnswerComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date()
      },
      id
    )

    return answerComment
  }

  get authorId() {
    return this.props.authorId
  }

  get answerId() {
    return this.props.answerID
  }

  get content() {
    return this.props.content
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }
}
