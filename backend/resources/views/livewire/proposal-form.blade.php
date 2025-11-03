<div class="card">
    @if($hasProposal)
        <div class="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <div class="text-4xl mb-4">✅</div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Oferta wysłana!</h3>
            <p class="text-gray-600">
                Twoja oferta została wysłana do zleceniodawcy. Otrzymasz powiadomienie gdy zostanie rozpatrzona.
            </p>
        </div>
    @else
        <h3 class="text-2xl font-bold text-gray-900 mb-6">💼 Złóż ofertę</h3>

        <form wire:submit="submit" class="space-y-6">

            {{-- Price --}}
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    Twoja cena * (PLN)
                </label>
                <input
                    type="number"
                    wire:model="price"
                    step="0.01"
                    min="0"
                    placeholder="np. 5000"
                    class="input"
                    required>
                @error('price')
                    <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>

            {{-- Delivery Days --}}
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    Termin realizacji * (dni)
                </label>
                <input
                    type="number"
                    wire:model="delivery_days"
                    min="1"
                    max="365"
                    placeholder="np. 14"
                    class="input"
                    required>
                @error('delivery_days')
                    <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                @enderror
                <p class="text-xs text-gray-500 mt-1">
                    @if($delivery_days)
                        Realizacja do: {{ now()->addDays($delivery_days)->format('d.m.Y') }}
                    @endif
                </p>
            </div>

            {{-- Description --}}
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    Opis oferty * (min. 50 znaków)
                </label>
                <textarea
                    wire:model="description"
                    rows="6"
                    placeholder="Opisz jak zrealizujesz ten projekt, Twoje doświadczenie, portfolio..."
                    class="input"
                    required></textarea>
                @error('description')
                    <p class="text-red-600 text-sm mt-1">{{ $message }}</p>
                @enderror
                <p class="text-xs text-gray-500 mt-1">{{ strlen($description) }}/2000 znaków</p>
            </div>

            {{-- Submit --}}
            <div class="flex items-center gap-4">
                <button type="submit"
                        wire:loading.attr="disabled"
                        class="btn btn-primary">
                    <span wire:loading.remove>📤 Wyślij ofertę</span>
                    <span wire:loading>
                        <i class="fa-solid fa-spinner fa-spin mr-2"></i>
                        Wysyłanie...
                    </span>
                </button>

                @if($price && $delivery_days)
                    <div class="text-sm text-gray-600">
                        <strong>{{ number_format($price, 2) }} PLN</strong> w {{ $delivery_days }} dni
                    </div>
                @endif
            </div>
        </form>
    @endif
</div>

