class ComponentsController < ApplicationController

    def index
        render json: Component.all, include: { synonyms: {only: [:name] }, deities: {only: [:name] }, uses: {only: [:name]}}
    end

    private
    def component_params
        params.require(:component).permit(:name, :latin, :planet, :element, :description)
    end

end
