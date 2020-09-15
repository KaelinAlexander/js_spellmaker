class SpellsController < ApplicationController

    def index
        render json: Spell.all, include: {components: {only: [:id, :name]}}
    end

    private
    def spell_params
        params.require(:spell).permit(:name, :process, :intention, :description)
    end

end
