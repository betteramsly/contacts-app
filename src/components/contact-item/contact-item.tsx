import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { mainSliceActions } from '../../redux/slice'
import { useAppDispatch } from '../../redux/store'
import styles from './contact-item.module.scss'

type ContactItemProps = {
  id: number
  number: number
  name: string
}

export const ContactItem: React.FC<ContactItemProps> = ({
  id,
  number,
  name,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [contactName, setContactName] = useState(name)
  const [contactNumber, setContactNumber] = useState(number)
  const dispatch = useAppDispatch()
  const { removeContact } = mainSliceActions
  const { editContact } = mainSliceActions

  const onContactDelete = () => {
    dispatch(removeContact(id))
  }

  const onContactEdit = () => {
    setIsEditing(false)
    dispatch(editContact({ id, name: contactName, number: contactNumber }))
  }

  return (
    <div className={styles.contact} key={id}>
      {isEditing ? (
        <>
          <input
            className={styles.inputName}
            type="text"
            value={contactName}
            onChange={(event) => {
              setContactName(event.target.value)
            }}
          />
          <input
            className={styles.inputNumber}
            type="text"
            value={contactNumber}
            onChange={(event) => {
              if (/^\d*$/.test(event.target.value)) {
                setContactNumber(+event.target.value)
              }
            }}
          />
        </>
      ) : (
        <>
          <h1>{name}</h1>
          <strong>{number}</strong>
        </>
      )}
      <div className={styles.contactsButtons}>
        <button className={styles.deleteButton} onClick={onContactDelete}>
          Удалить
        </button>
        {isEditing ? (
          <button className={styles.saveButton} onClick={onContactEdit}>
            Сохранить
          </button>
        ) : (
          <button
            className={styles.editButton}
            onClick={() => setIsEditing(true)}
          >
            Редактировать
          </button>
        )}
      </div>
    </div>
  )
}
