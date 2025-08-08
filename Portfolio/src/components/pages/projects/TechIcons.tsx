type TechIconsProps = {
  stack: Array<string>
}

export function TechIcons({ stack }: TechIconsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 justify-start">
      {stack.map((tech, index) => (
        <span
          key={`${tech}-${index}`}
          className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-gray-200"
        >
          {tech}
        </span>
      ))}
    </div>
  )
}

export default TechIcons
