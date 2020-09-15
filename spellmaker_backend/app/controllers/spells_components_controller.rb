class SpellsComponentsController < ApplicationController

    def index
        render json: SpellsComponent.all, include: { spell: {only: [:id, :name, :process, :intention, :description]}, component: { only: [:id, :name, :planet, :element, :description] } }
    end

    def show
        spell = SpellsComponent.find(params[:id])
        render json: spell, include: { spell: {only: [:id, :name, :process, :intention, :description]}, component: { only: [:id, :name, :planet, :element, :description] } }
    end

end