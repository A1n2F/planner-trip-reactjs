import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { Button } from "../../../components/button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker"
import { format } from "date-fns"
import "react-day-picker/dist/style.css"

interface DestinationAndDateStepProps {
    isGuestsInputOpen: boolean
    closeGuestsInput: () => void 
    openGuestsInput: () => void
    setDestination: (destination: string) => void
    setEventStartAndDates: (dates: DateRange | undefined) => void
    eventStartAndDates: DateRange | undefined
}

export function DestinationAndDateStep({ isGuestsInputOpen, closeGuestsInput, openGuestsInput, setDestination, setEventStartAndDates, eventStartAndDates }: DestinationAndDateStepProps) {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

    function openDatePicker() {
      return (
        setIsDatePickerOpen(true)
      )
    }

    function closeDatePicker() {
      return (
        setIsDatePickerOpen(false)
      )
    }

    const displayedDate = eventStartAndDates && eventStartAndDates.from && eventStartAndDates.to
      ? format(eventStartAndDates.from, "d' de 'LLL").concat(" até ").concat(format(eventStartAndDates.to, "d' de 'LLL")) 
      : null

    return (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center gap-3">
          <div className="flex items-center gap-2 flex-1">
            <MapPin className="w-5 h-5 text-zinc-400" />
            <input 
              disabled={isGuestsInputOpen} 
              type="text" 
              placeholder="Para onde você vai?" 
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              onChange={event => setDestination(event.target.value)}
              />
          </div>

          <button onClick={openDatePicker} disabled={isGuestsInputOpen} className="flex items-center gap-2 text-left cursor-pointer w-[220px]">
            <Calendar className="w-5 h-5 text-zinc-400" />
            <span className="text-lg text-zinc-400 w-30 flex-1">
              {displayedDate || "Quando?"}
            </span>
          </button>

          {isDatePickerOpen && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
              <div className="rounded-xl py-5 px-6 bg-zinc-900 space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Selecione a data</h2>

                    <button onClick={closeDatePicker} type="button">
                      <X className="w-5 h-5 text-zinc-400 cursor-pointer" />
                    </button>
                  </div>
                </div>

                <DayPicker mode="range" selected={eventStartAndDates} onSelect={setEventStartAndDates} />
              </div>
            </div>
          )}



          <div className="w-px h-6 bg-zinc-800" />

          {isGuestsInputOpen ? (
            <Button onClick={closeGuestsInput} variant="secondary">
              Alterar local/data
              <Settings2 className="w-5 h-5" />  
            </Button>
          ) : (
            <Button onClick={openGuestsInput} variant="primary">
              Continuar
              <ArrowRight className="w-5 h-5" /> 
            </Button>
          )}
        </div>
    )
}