class SpellsController < ApplicationController

    def index
        render json: Spell.all, include: {components: {only: [:id, :name]}}
    end

    def create
        @spell = Spell.new(spell_params)
        if @spell.save
            render json: @spell, include: {components: {only: [:id, :name]}}, status: :created
        else
            render json: @spell.errors.full_messages, status: :unprocessable_entity
        end 
    end

    private
    def spell_params
        params.require(:spell).permit(:name, :process, :intention, :description)
    end

end
