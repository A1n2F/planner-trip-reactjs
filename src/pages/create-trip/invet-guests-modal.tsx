import { AtSign, Plus, X } from "lucide-react"
import { FormEvent } from "react"
import { Button } from "../../components/button"

interface InviteGuestsModalProps {
    closeGuestesModal: () => void
    emailsToInvite: string[]
    addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void
    removeEmailFromInvites: (email: string) => void
}

export function InviteGuestsModal({ addNewEmailToInvite, closeGuestesModal, emailsToInvite, removeEmailFromInvites}: InviteGuestsModalProps) {
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[640px] rounded-xl py-5 px-6 bg-zinc-900 space-y-5">
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecionar convidados</h2>

                <button onClick={closeGuestesModal} type="button">
                    <X className="w-5 h-5 text-zinc-400 cursor-pointer" />
                </button>
                </div>

                <p className="text-sm text-zinc-400">
                Os convidados irão receber e-mails para confirmar a participação na viagem.
                </p>
            </div>

            <div className="flex flex-wrap gap-2">
                {emailsToInvite.map(email => {
                return (
                    <div key={email} className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
                    <span className="text-zinc-300">{email}</span>
                    <button onClick={() => removeEmailFromInvites(email)} type="button">
                        <X className="w-4 h-4 text-zinc-400" />
                    </button>
                    </div>
                )
                })}
            </div>

            <div className="w-full h-px bg-zinc-800" />
            
            <form onSubmit={addNewEmailToInvite} className="py-2.5 px-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <div className="px-2 flex items-center flex-1 gap-2">
                <AtSign className="w-5 h-5 text-zinc-400" />
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Digite o e-mail do convidado" 
                    className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                />
                </div>

                <Button type="submit" variant="primary">
                    Convidar
                    <Plus className="w-5 h-5" />
                </Button>
            </form>
            </div>
      </div>
    )
}