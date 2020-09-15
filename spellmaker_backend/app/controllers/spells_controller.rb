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

    def update
        @spell = Spell.find(params[:id].to_i)
        if @spell.update(spell_params)
            render json: @spell
        else
            render json: @spell.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @spell = Spell.find(params[:id].to_i)
        @spell.destroy
        render json: @spell
    end

    private
    def spell_params
        params.require(:spell).permit(:name, :process, :intention, :description)
    end

end
