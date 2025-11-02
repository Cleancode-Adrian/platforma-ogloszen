<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Models\User;
use Filament\Forms;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Table;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            Forms\Components\Section::make('Informacje podstawowe')->schema([
                Forms\Components\TextInput::make('name')
                    ->label('Imię i nazwisko')
                    ->required(),
                Forms\Components\TextInput::make('email')
                    ->label('Email')
                    ->email()
                    ->required(),
                Forms\Components\TextInput::make('phone')
                    ->label('Telefon'),
                Forms\Components\TextInput::make('company')
                    ->label('Firma'),
            ])->columns(2),

            Forms\Components\Section::make('Rola i status')->schema([
                Forms\Components\Select::make('role')
                    ->label('Rola')
                    ->options([
                        'user' => 'Użytkownik',
                        'admin' => 'Administrator',
                    ])
                    ->required()
                    ->default('user'),
                Forms\Components\Toggle::make('is_approved')
                    ->label('Zatwierdzony')
                    ->required(),
            ])->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                ->label('Nazwa')
                ->searchable()
                ->sortable(),
            Tables\Columns\TextColumn::make('email')
                ->label('Email')
                ->searchable(),
            Tables\Columns\TextColumn::make('company')
                ->label('Firma')
                ->searchable()
                ->toggleable(),
            Tables\Columns\BadgeColumn::make('role')
                ->label('Rola')
                ->colors([
                    'primary' => 'user',
                    'danger' => 'admin',
                ])
                ->formatStateUsing(fn (string $state) => $state === 'admin' ? 'Administrator' : 'Użytkownik'),
            Tables\Columns\IconColumn::make('is_approved')
                ->label('Zatwierdzony')
                ->boolean()
                ->sortable(),
            Tables\Columns\TextColumn::make('created_at')
                ->label('Data rejestracji')
                ->dateTime('d.m.Y H:i')
                ->sortable(),
        ])
        ->filters([
            Tables\Filters\TernaryFilter::make('is_approved')
                ->label('Zatwierdzony'),
            Tables\Filters\SelectFilter::make('role')
                ->options([
                    'user' => 'Użytkownik',
                    'admin' => 'Administrator',
                ]),
        ])
        ->actions([
            Tables\Actions\EditAction::make(),
            Tables\Actions\Action::make('approve')
                ->label('Zatwierdź')
                ->icon('heroicon-o-check-circle')
                ->color('success')
                ->requiresConfirmation()
                ->action(fn (User $record) => $record->update(['is_approved' => true]))
                ->visible(fn (User $record) => !$record->is_approved),
        ])
        ->bulkActions([
            Tables\Actions\BulkActionGroup::make([
                Tables\Actions\BulkAction::make('approve')
                    ->label('Zatwierdź zaznaczone')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->requiresConfirmation()
                    ->action(fn ($records) => $records->each->update(['is_approved' => true])),
                Tables\Actions\DeleteBulkAction::make(),
            ]),
        ])
        ->defaultSort('created_at', 'desc');
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }
}

