class SpellsComponentsController < ApplicationController

    def index
        render json: SpellsComponent.all, include: { spell: {only: [:id, :name, :process, :intention, :description]}, component: { only: [:id, :name, :planet, :element, :description] } }
    end

    def show
        spell = SpellsComponent.find(params[:id])
        render json: spell, include: { spell: {only: [:id, :name, :process, :intention, :description]}, component: { only: [:id, :name, :planet, :element, :description] } }
    end

    def create
        @assoc = SpellsComponent.new(spells_component_params)
        if @assoc.save
            render json: @assoc, include: { spell: {only: [:id, :name, :process, :intention, :description]}, component: { only: [:id, :name, :planet, :element, :description] } }, status: :created
        else
            render json: @assoc.errors.full_messages, status: :unprocessable_entity
        end 
    end

    def destroy
        @assoc = Component.find(params[:id].to_i)
        @assoc.destroy
        render json: @assoc
    end

    private
    def spells_component_params
        params.require(:spells_component).permit(:spell_id, :component_id)
    end


end