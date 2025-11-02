<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AnnouncementResource\Pages;
use App\Models\Announcement;
use Filament\Forms;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Table;

class AnnouncementResource extends Resource
{
    protected static ?string $model = Announcement::class;

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            Forms\Components\Section::make('Podstawowe informacje')->schema([
                Forms\Components\Select::make('user_id')
                    ->label('Użytkownik')
                    ->relationship('user', 'name')
                    ->required()
                    ->searchable(),
                Forms\Components\Select::make('category_id')
                    ->label('Kategoria')
                    ->relationship('category', 'name')
                    ->required(),
                Forms\Components\TextInput::make('title')
                    ->label('Tytuł')
                    ->required()
                    ->maxLength(255)
                    ->columnSpanFull(),
                Forms\Components\Textarea::make('description')
                    ->label('Opis')
                    ->required()
                    ->rows(6)
                    ->columnSpanFull(),
            ])->columns(2),

            Forms\Components\Section::make('Budżet i terminy')->schema([
                Forms\Components\TextInput::make('budget_min')
                    ->label('Budżet min (PLN)')
                    ->numeric()
                    ->minValue(0),
                Forms\Components\TextInput::make('budget_max')
                    ->label('Budżet max (PLN)')
                    ->numeric()
                    ->minValue(0),
                Forms\Components\TextInput::make('deadline')
                    ->label('Termin realizacji'),
                Forms\Components\TextInput::make('location')
                    ->label('Lokalizacja'),
            ])->columns(2),

            Forms\Components\Section::make('Status i moderacja')->schema([
                Forms\Components\Select::make('status')
                    ->label('Status')
                    ->options([
                        'draft' => 'Wersja robocza',
                        'pending' => 'Oczekujące',
                        'published' => 'Opublikowane',
                        'rejected' => 'Odrzucone',
                        'closed' => 'Zamknięte',
                    ])
                    ->required()
                    ->default('pending'),
                Forms\Components\Toggle::make('is_approved')
                    ->label('Zatwierdzone')
                    ->helperText('Czy ogłoszenie jest widoczne publicznie'),
                Forms\Components\Toggle::make('is_urgent')
                    ->label('Pilne'),
                Forms\Components\Textarea::make('rejection_reason')
                    ->label('Powód odrzucenia')
                    ->rows(3)
                    ->visible(fn ($get) => $get('status') === 'rejected')
                    ->columnSpanFull(),
            ])->columns(3),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                ->label('Tytuł')
                ->searchable()
                ->limit(50)
                ->sortable(),
            Tables\Columns\TextColumn::make('user.name')
                ->label('Użytkownik')
                ->searchable()
                ->sortable(),
            Tables\Columns\TextColumn::make('category.name')
                ->label('Kategoria')
                ->badge(),
            Tables\Columns\TextColumn::make('budget_min')
                ->label('Budżet')
                ->formatStateUsing(fn ($record) => $record->budget_range)
                ->sortable(),
            Tables\Columns\BadgeColumn::make('status')
                ->label('Status')
                ->colors([
                    'secondary' => 'draft',
                    'warning' => 'pending',
                    'success' => 'published',
                    'danger' => 'rejected',
                ])
                ->formatStateUsing(fn (string $state) => match ($state) {
                    'draft' => 'Wersja robocza',
                    'pending' => 'Oczekujące',
                    'published' => 'Opublikowane',
                    'rejected' => 'Odrzucone',
                    'closed' => 'Zamknięte',
                    default => $state,
                }),
            Tables\Columns\IconColumn::make('is_approved')
                ->label('Zatw.')
                ->boolean(),
            Tables\Columns\IconColumn::make('is_urgent')
                ->label('Pilne')
                ->boolean(),
            Tables\Columns\TextColumn::make('created_at')
                ->label('Data')
                ->dateTime('d.m.Y H:i')
                ->sortable(),
        ])
        ->filters([
            Tables\Filters\SelectFilter::make('status')
                ->label('Status')
                ->options([
                    'pending' => 'Oczekujące',
                    'published' => 'Opublikowane',
                    'rejected' => 'Odrzucone',
                ]),
            Tables\Filters\TernaryFilter::make('is_approved')
                ->label('Zatwierdzone'),
            Tables\Filters\SelectFilter::make('category')
                ->relationship('category', 'name'),
        ])
        ->actions([
            Tables\Actions\EditAction::make(),
            Tables\Actions\Action::make('approve')
                ->label('Zatwierdź')
                ->icon('heroicon-o-check-circle')
                ->color('success')
                ->requiresConfirmation()
                ->action(function (Announcement $record) {
                    $record->update([
                        'is_approved' => true,
                        'status' => 'published',
                        'approved_at' => now(),
                    ]);
                })
                ->visible(fn (Announcement $record) => !$record->is_approved),
            Tables\Actions\Action::make('reject')
                ->label('Odrzuć')
                ->icon('heroicon-o-x-circle')
                ->color('danger')
                ->requiresConfirmation()
                ->form([
                    Forms\Components\Textarea::make('rejection_reason')
                        ->label('Powód odrzucenia')
                        ->required()
                        ->rows(3),
                ])
                ->action(function (Announcement $record, array $data) {
                    $record->update([
                        'is_approved' => false,
                        'status' => 'rejected',
                        'rejection_reason' => $data['rejection_reason'],
                    ]);
                }),
        ])
        ->bulkActions([
            Tables\Actions\BulkActionGroup::make([
                Tables\Actions\BulkAction::make('approve')
                    ->label('Zatwierdź zaznaczone')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->requiresConfirmation()
                    ->action(function ($records) {
                        $records->each(fn ($record) => $record->update([
                            'is_approved' => true,
                            'status' => 'published',
                            'approved_at' => now(),
                        ]));
                    }),
                Tables\Actions\DeleteBulkAction::make(),
            ]),
        ])
        ->defaultSort('created_at', 'desc');
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListAnnouncements::route('/'),
            'create' => Pages\CreateAnnouncement::route('/create'),
            'edit' => Pages\EditAnnouncement::route('/{record}/edit'),
        ];
    }
}

