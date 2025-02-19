import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";

export function ImportantLinks() {
    return (
        <div className="space-y-6">
        <h2 className="text-xl font-semibold">Links importantes</h2>

        <div className="space-y-5">
            <div className="flex items-center justify-between gap-4">
                <div className="space-y-1.5">
                    <span className="block font-medium text-zinc-100">Reserva do AirBnB</span>
                    <a href="#" className="block text-sm text-zinc-400 truncate hover:text-zinc-200">
                        https://airbnb.com.br/room/1010019208u45934789394789
                    </a>
                </div>
                <Link2 className="w-5 h-5 text-zinc-400 shrink-0" />
            </div>

            <div className="flex items-center justify-between gap-4">
                <div className="space-y-1.5">
                    <span className="block font-medium text-zinc-100">Reserva do AirBnB</span>
                    <a href="#" className="block text-sm text-zinc-400 truncate hover:text-zinc-200">
                        https://airbnb.com.br/room/1010019208u45934789394789
                    </a>
                </div>
                <Link2 className="w-5 h-5 text-zinc-400 shrink-0" />
            </div>
        </div>

        <Button variant="secondary" size="full">
            <Plus className="w-5 h-5" />
            Cadastrar novo link    
        </Button>
    </div>
    )
}