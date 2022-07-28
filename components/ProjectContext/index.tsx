import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
export type ProjectContextType = {
  currentProject: number;
  setCurrentProject: any;
};

export const ProjectContext = createContext<ProjectContextType>({
  currentProject: 0,
  setCurrentProject: () => {},
});

type Props = {
  children: ReactNode;
};

const ProjectManager = ({ children }: Props) => {
  const [currentProject, setCurrentProject] = useState(0);

  const value = useMemo(
    () => ({ currentProject, setCurrentProject }),
    [currentProject]
  );

  useEffect(() => {
    console.log(currentProject);
  }, [currentProject]);
  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};

export default ProjectManager;
