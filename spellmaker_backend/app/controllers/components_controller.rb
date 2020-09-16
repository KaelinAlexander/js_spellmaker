class ComponentsController < ApplicationController

    def index
        render json: Component.all, include: { synonyms: {only: [:id, :name] }, deities: {only: [:id, :name] }, uses: {only: [:id, :name]}}
    end

    def create
        byebug
        @component = Component.new(component_params)
        if @component.save
            render json: @component, include: {synonyms: {only: [:id, :name]}, deities: {only: [:id, :name]}, uses: {only: [:id, :name]}}, status: :created
        else
            render json: @component.errors.full_messages, status: :unprocessable_entity
        end 
    end

    private
    def component_params
        params.require(:component).permit(:name, :latin, :planet, :element, :description, :toxic, :deities_attributes => [:name], :uses_attributes => [:name], :synonyms_attributes => [:name] )
    end

end
