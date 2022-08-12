import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Contact, mainSliceActions } from '../../redux/slice'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { ContactItem } from '../contact-item/contact-item'

import styles from './contacts.module.scss'

export const Contacts = () => {
  const [isOpenCreateContact, setIsOpenCreateContact] = useState(false)
  const [contactName, setContactName] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [searchInputValue, setSearchInputValue] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchedContacts, setSearchedContacts] = useState<Contact[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const contacts = useAppSelector((store) => store.main.contacts)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { addContact } = mainSliceActions

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/')
    }
  }, [navigate])

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (/^\d*$/.test(event.target.value)) {
      setContactNumber(event.target.value)
    }
  }

  const handleSearch = () => {
    if (!searchInputValue) {
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    const results = contacts.filter(
      (contact) =>
        !!contact.name.toLowerCase().includes(searchInputValue.toLowerCase())
    )
    setSearchedContacts(results)
  }

  const onContactAdd = () => {
    if (contactName === '' || contactNumber === '') {
      return
    }
    dispatch(
      addContact({
        id: Math.random(),
        name: contactName,
        number: contactNumber,
      })
    )

    setContactName('')
    setContactNumber('')
    inputRef.current?.focus()
  }

  return (
    <div className={styles.contactsWrapper}>
      <div className={styles.contactHead}>Контакты</div>
      <form onSubmit={(event) => event.preventDefault()} className={styles.inputStyle}>
        <button
          className={styles.openContactSearchWindow}
          onClick={() => {
            setIsOpenCreateContact(true)
          }}
        >
          Создать контакт
        </button>
        {isOpenCreateContact && (
          <>
            <input
              ref={inputRef}
              className={styles.nameInput}
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              type="text"
              placeholder="Имя"
            />
            <input
              className={styles.inputNumber}
              onKeyDown={(event) => {
                if (event.code === 'Enter') {
                  onContactAdd()
                }
              }}
              onChange={onChangeInput}
              placeholder="Номер"
              value={contactNumber}
              type="text"
            />
            <button
              className={styles.addButton}
              type="button"
              onClick={onContactAdd}
            >
              Добавить
            </button>
          </>
        )}
      </form>

      <form onSubmit={(event) => event.preventDefault()} className={styles.searchBlock}>
        <input
          className={styles.searchContacts}
          onKeyDown={(event) => {
            if (event.code === 'Enter') {
              handleSearch()
            }
          }}
          value={searchInputValue}
          onChange={({ target }) => setSearchInputValue(target.value)}
          type="text"
          placeholder="Введите название контакта"
        />
        <button className={styles.searchButton} onClick={handleSearch}>
          Поиск
        </button>
        <button
          className={styles.resetSearch}
          onClick={() => {
            setSearchInputValue('')
            setIsSearching(false)
          }}
        >
          Сбросить поиск
        </button>
      </form>

      <div>
        {isSearching
          ? searchedContacts.map((contact) => (
              <ContactItem key={contact.id} {...contact} />
            ))
          : contacts.map((contact) => (
              <ContactItem key={contact.id} {...contact} />
            ))}
      </div>
    </div>
  )
}
