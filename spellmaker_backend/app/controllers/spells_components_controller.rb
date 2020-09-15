class SpellsComponentsController < ApplicationController

    def index
        render json: SpellsComponent.all, include: { spell: {only: [:name, :process, :intention, :description]}, component: { only: [:name, :planet, :element, :description] } }
    end

    def show
        spell = SpellsComponent.find(params[:id])
        render json: spell, include: { spell: {only: [:name, :process, :intention, :description]}, component: { only: [:name, :planet, :element, :description] } }
    end

end