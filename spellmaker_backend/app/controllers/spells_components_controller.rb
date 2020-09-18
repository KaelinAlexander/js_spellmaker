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

    def deletion
        @spell_id = params[:spells_component][:spell_id].to_i
        @component_id = params[:spells_component][:component_id].to_i
        @assoc = SpellsComponent.where({ spell_id: @spell_id, component_id: @component_id })
        @assoc.destroy_all
        render json: @assoc
    end

    private
    def spells_component_params
        params.require(:spells_component).permit(:spell_id, :component_id)
    end


end