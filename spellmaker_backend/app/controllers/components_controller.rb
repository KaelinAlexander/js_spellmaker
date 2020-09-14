class ComponentsController < ApplicationController

    def index
        render json: Component.all
    end

    private
    def component_params
        params.require(:component).permit(:name, :latin, :planet, :element, :description)
    end

end
