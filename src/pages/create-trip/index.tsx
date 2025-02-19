import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { InviteGuestsModal } from "./invet-guests-modal"
import { ConfirmTripModal } from "./confirm-trip-modal"
import { DestinationAndDateStep } from "./steps/destination-and-date-step"
import { InviteGuestsStep } from "./steps/invite-guests-step"
import { DateRange } from "react-day-picker"
import { api } from "../../lib/axios"

export function CreateTripPage() {
  const navigate = useNavigate()

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)

  const [destination, setDestination] = useState("")
  const [ownerName, setOwnerName] = useState("")
  const [ownerEmail, setOwnerEmail] = useState("")
  const [eventStartAndDates, setEventStartAndDates] = useState<DateRange | undefined>()

  const [emailsToInvite, setEmailsToInvite] = useState(["diego@email.com"])

  function openGuestsInput() {
    setIsGuestsInputOpen(true)
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false)
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true)
  }

  function closeGuestesModal() {
    setIsGuestsModalOpen(false)
  }

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true)
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false)
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get("email")?.toString()

    if(!email) {
      return
    }

    if (emailsToInvite.includes(email)) {
      return (
        alert("Esse e-mail já está cadastrado.")
      )
    }

    setEmailsToInvite([
      ...emailsToInvite,
      email
    ])

    event.currentTarget.reset()
  }

  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(email => email !== emailToRemove)

    setEmailsToInvite(newEmailList)
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    console.log(destination)
    console.log(eventStartAndDates)
    console.log(emailsToInvite)
    console.log(ownerName)
    console.log(ownerEmail)

    if (!destination) {
      return 
    }

    if (!eventStartAndDates?.from || !eventStartAndDates?.to) {
      return 
    }

    if (emailsToInvite.length === 0) {
      return 
    }

    if (!ownerName || !ownerEmail) {
      return
    }

    const response = await api.post('/trips', {
      destination,
      starts_at: eventStartAndDates.from,
      ends_at: eventStartAndDates.to,
      emails_to_invite: emailsToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail
    })

    const { tripId } = response.data

    navigate(`/trips/${tripId}`)
  }

  return (
    <div className="h-screen flex justify-center items-center bg-[url(./bg.png)] bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="./logo.svg" alt="Logo Planner" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className="space-y-4">
            <DestinationAndDateStep
                isGuestsInputOpen={isGuestsInputOpen}
                closeGuestsInput={closeGuestsInput}
                openGuestsInput={openGuestsInput}
                setDestination={setDestination}
                eventStartAndDates={eventStartAndDates}
                setEventStartAndDates={setEventStartAndDates}
            />

        {isGuestsInputOpen && (
            <InviteGuestsStep
                openGuestsModal={openGuestsModal}
                emailsToInvite={emailsToInvite}
                openConfirmTripModal={openConfirmTripModal}
            />
        )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
          com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">políticas de privacidade</a>.
        </p>
      </div>

      {isGuestsModalOpen && (
        <InviteGuestsModal
            emailsToInvite={emailsToInvite}
            addNewEmailToInvite={addNewEmailToInvite}
            closeGuestesModal={closeGuestesModal}
            removeEmailFromInvites={removeEmailFromInvites}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal
            closeConfirmTripModal={closeConfirmTripModal}
            createTrip={createTrip}
            setOwnerName={setOwnerName}
            setOwnerEmail={setOwnerEmail}
        />
      )}
    </div>
  )
}