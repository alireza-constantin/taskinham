export default function({ params }: { params: { id: string } }){
    return <div>Hello Dynamic Page {params.id}</div>
}