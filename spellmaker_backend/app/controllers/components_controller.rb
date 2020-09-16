class ComponentsController < ApplicationController

    def index
        render json: Component.all, include: { synonyms: {only: [:id, :name] }, deities: {only: [:id, :name] }, uses: {only: [:id, :name]}}
    end

    def create
        @component = Component.new(component_params)
        if @component.save
            render json: @component, include: {synonyms: {only: [:id, :name]}, deities: {only: [:id, :name]}, uses: {only: [:id, :name]}}, status: :created
        else
            render json: @component.errors.full_messages, status: :unprocessable_entity
        end 
    end

    def update
        @component = Component.find(params[:id].to_i)
        if @component.update(component_params)
            render json: @component, include: {synonyms: {only: [:id, :name]}, deities: {only: [:id, :name]}, uses: {only: [:id, :name]}}, status: :created
        else
            render json: @component.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @component = Component.find(params[:id].to_i)
        @component.destroy
        render json: @component
    end

    private
    def component_params
        params.require(:component).permit(:name, :latin, :planet, :element, :description, :toxic, :deities_attributes => [:name], :uses_attributes => [:name], :synonyms_attributes => [:name] )
    end

end
